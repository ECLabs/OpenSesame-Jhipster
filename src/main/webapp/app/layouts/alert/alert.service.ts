import {Injectable} from '@angular/core'

export class MyAlertService {
  alertStatus: boolean;

  constructor(){}

  getAlertStatus(){
    return this.alertStatus;
  }

  setAlertStatus(alertStatus: boolean){
    this.alertStatus = alertStatus;
  }
}
