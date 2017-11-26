import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';

@Injectable()
export class DB {

    private db;
    public isConnectionExist: boolean = false;
    public isAllTablesExist: boolean = false;
    public availableTables = [];

    constructor() { }

    public connect(): Promise<Object> {
        let result = {};
        return new Promise((resolve, reject) => {
            if (!this.isConnectionExist) {
                this.db = new SQLite();
                this.db.openDatabase({
                    name: 'trofeo_solution.db',
                    location: 'default'
                }).then(() => {
                    this.isConnectionExist = true;
                    resolve(result);
                }, (err) => {
                    this.debug('Unable to open the database connection', err);
                    reject(result);
                });
            } else {
                resolve(result);
            }
        });
    }

    public get(sql, params): Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            this.db.executeSql(sql, params).then(
                (result) => {
                    let data = [];
                    for(let i=0 ;i<result.rows.length; i++) {
                        data.push(result.rows.item(i));
                    }                    
                    resolve(data);
                },
                (err) => {
                    this.debug('Select Query Error: ' + sql, err)
                    reject(err);
                });
        });
    }

    public save(sql, params): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.db.executeSql(sql, params).then(
                (result) => {
                    let data = {};
                    data['insertId'] = result.insertId;
                    resolve(data);
                },
                (err) => {
                    this.debug('Insert/Update Query Error: ' + sql, err)
                    reject(err);
                }
            );
        });
    }


    public delete(sql: string, params: any): Promise<Object> {
        return new Promise((resolve, reject) => {
            this.db.executeSql(sql, params).then(
                (result) => {
                    resolve(result);
                },
                (err) => {
                    this.debug('delete Query Error: ' + sql, err)
                    reject(err);
                }
            );
        });
    }

    public debug(msg: string, err: any) {
        alert(msg + ' ' + JSON.stringify(err));
    }

}
