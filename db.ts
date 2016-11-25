import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite,Dialogs} from 'ionic-native';

/*
  Generated class for the DB provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DB {

  private db;
  private isConnectionExist:boolean = false;

  constructor(public http: Http) {
    this.initDBConnection();
  }

  private initDBConnection():void {
  	this.db = new SQLite();
    this.db.openDatabase({
    	name:'databaseName.db',
    	location:'default'
    }).then(
    ()=>{
    	this.isConnectionExist = true;
    },
    (err)=>{
    	this.debug('Unable to open the database connection', err);
    });
  }

  public select(sql, params):Promise<Array<Object>> {
  	return new Promise((resolve, reject) => {  		
  		this.db.executeSql(sql, params).then(
  			(result)=>{  					
  				resolve(result.rows.item);
  			},
  			(err)=>{
  				this.debug('Select Query Error: '+sql, err)
  				reject(err);
  			});
  	});
  }

  public insert(sql, params):Promise<Object> {
  	return new Promise((resolve, reject)=>{
  		this.db.executeSql(sql, params).then(
  			(result)=>{  				
  				resolve(result);
  			},
  			(err)=>{
  				this.debug('Insert Query Error: '+sql, err)
  				reject(err);
  			}
  		);
  	});
  }

  public update(sql:string, params:any):Promise<Object> {
  	return new Promise((resolve, reject)=>{
  		this.db.executeSql(sql, params).then(
  			(result)=>{
  				resolve(result);
  			},
  			(err) => {
  				this.debug('Update Query Error: '+sql, err)
  				reject(err);
  			}
  		);
  	});
  }

  public delete(sql:string, params:any):Promise<Object> {
  	return new Promise((resolve, reject)=>{
  		this.db.executeSql(sql, params).then(
  			(result)=>{
  				resolve(result);
  			},
  			(err) => {
  				this.debug('delete Query Error: '+sql, err)
  				reject(err);
  			}
  		);
  	});
  }






  public debug(msg:string, err:any) {
  	if(this.isConnectionExist) {
  		alert(msg +' '+JSON.stringify(err));
  	}
  	else {
  		console.log(msg+' '+JSON.stringify(err));
  	}
  }

}
