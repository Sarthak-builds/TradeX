type MessageCallback = (data: any) => void;

class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string;
  private callbacks: Map<string, Set<MessageCallback>> = new Map();
  private reconnectTimeout: any = null;
  private maxReconnectAttempts = 5;
  private reconnectAttempts = 0;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    try {
      this.socket = new WebSocket(this.url);

      this.socket.onopen = () => {
        console.log('[WebSocket] Connected to TradeX Stream');
        this.reconnectAttempts = 0;
      };

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { type } = data;
        const typeCallbacks = this.callbacks.get(type);
        if (typeCallbacks) {
          typeCallbacks.forEach((callback) => callback(data.payload));
        }
      };

      this.socket.onclose = () => {
        console.warn('[WebSocket] Connection closed. Attempting reconnect...');
        this.attemptReconnect();
      };

      this.socket.onerror = (error) => {
        console.error('[WebSocket] Terminal Error:', error);
      };
    } catch (err) {
      console.error('[WebSocket] Connection Failed:', err);
      this.attemptReconnect();
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      this.reconnectTimeout = setTimeout(() => this.connect(), delay);
    }
  }

  subscribe(type: string, callback: MessageCallback) {
    if (!this.callbacks.has(type)) {
      this.callbacks.set(type, new Set());
    }
    this.callbacks.get(type)!.add(callback);
    return () => this.unsubscribe(type, callback);
  }

  unsubscribe(type: string, callback: MessageCallback) {
    const typeCallbacks = this.callbacks.get(type);
    if (typeCallbacks) {
      typeCallbacks.delete(callback);
    }
  }

  send(type: string, payload: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, payload }));
    } else {
      console.error('[WebSocket] Socket not connected. Message dropped.');
    }
  }

  disconnect() {
    if (this.reconnectTimeout) clearTimeout(this.reconnectTimeout);
    if (this.socket) {
      this.socket.onclose = null; // Prevent reconnect
      this.socket.close();
    }
  }
}

export const wsClient = new WebSocketClient(
  process.env.NEXT_PUBLIC_WS_URL || ''
);
