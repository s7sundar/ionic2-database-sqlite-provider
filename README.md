# ionic2-database-sqlite-provider

Load the provider on component and execute query like this

    this.db.connect().then((result1) => {
        this.db.get("SELECT * FROM table", {}).then((result)=>{
      //process your response   
        });
    }, (err) => {
        //handle errors

    });

