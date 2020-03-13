import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { Constances } from '../common/constances';

const connectionOptions = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket']
};

@Injectable()

export class ChatService {

    // https://blooming-beyond-32050.herokuapp.com
    private socketioUrl = 'http://localhost:3000';
    private socket = io(this.socketioUrl, connectionOptions);

    private user = new BehaviorSubject<any>('');
    user$ = this.user.asObservable();

    emitUser(value) {
        this.user.next(value);
    }

    connectUser(user) {
        this.socket.emit('USER_CONNECTED', user);
    }

    connectedUsers() {
        const observable = new Observable<any>(observer => {
            this.socket.on('USER_CONNECTED', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });

        return observable;
    }

    joinPlace(data) {
        this.socket.emit('join', data);
    }

    newUserJoined() {
        const observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('new user joined', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });

        return observable;
    }

    addPlace(data) {
        this.socket.emit('place', data);
    }

    newPlaces() {
        const observable = new Observable<any>(observer => {
            this.socket.on('place', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });

        return observable;
    }

    leavePlace(data) {
        this.socket.emit('leave', data);
    }

    startTyping(data) {
        this.socket.emit(Constances.TYPING, data);
    }

    typing() {
        const observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on(Constances.TYPING, (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });

        return observable;
    }

    userLeftPlace() {
        const observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('left place', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });

        return observable;
    }

    sendMessage(data) {
        this.socket.emit('message', data);
    }

    newMessageReceived() {
        const observable = new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => { this.socket.disconnect(); };
        });

        return observable;
    }
}
