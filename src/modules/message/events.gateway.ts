import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
const l = console.log

@WebSocketGateway(5000)
export class EventsGateway {
  @WebSocketServer() server;

  @SubscribeMessage('private message')
  handleEvent(client: any, payload: any): Observable<WsResponse<any>> | any {
    // this.server.emit('resmsg', data);  // io.emit('resmsg', payload)
    let { name } = payload;
    if (name === 'ajanuw') {
      return of({
        event: 'events',
        data: {
          msg: 'hello ajanuw!'
        }
      })
    }
    return of(payload);
  }

}