import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    loadOrders() {
        this.dataSource.getOrders().subscribe((orders) => {
            this.orders = orders;
            this.loaded = true;
        });
    }

    getOrders(): Order[] {
        if (!this.loaded) this.loadOrders(); // поскольку тут асинхронное, то вернется судя по всему не то значение
        return this.orders;
    }

    saveOrder(order: Order): Observable<Order> {
        this.loaded = false; // Тоже непонятно, почему не сделать сразу апдейт списка
        return this.dataSource.saveOrder(order);
    }

    updateOrder(order: Order) {
        this.dataSource.updateOrder(order).subscribe((order) => {
            this.orders.splice(
                this.orders.findIndex((o) => o.id == order.id),
                1,
                order
            );
        });
    }

    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id).subscribe((order) => {
            this.orders.splice(
                this.orders.findIndex((o) => id == o.id),
                1
            );
        });
    }
}
