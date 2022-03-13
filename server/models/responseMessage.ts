export default class ResponseMessage {
  status: number;
  data?: any;
  error?: any;

  constructor(status: number, data?: any, error?: any) {
    this.status = status;
    this.data = data;
    this.error = error;
  }
}
