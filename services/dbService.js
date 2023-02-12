

// Requiring modules

const { MAX } = require('mssql/msnodesqlv8');
const sql = require("mssql/msnodesqlv8");

const { getConfig } =  require('./configService');

const sqlConfig = {
    server: '.',
    port: 1433,
    database:  "", 
    options: {
      trustedConnection: true
    }
    
};

function init(){
  getConfig().then (
    (config) => {
      sqlConfig.database = config.DB_NAME;
     }
 
 )
}

function getDetails(){
  return  sql.connect(sqlConfig).then(pool => {
    // Stored procedure
   return pool.request()
       .execute('GetDetails')
})
}

function getAddressee(){
  return  sql.connect(sqlConfig).then(pool => {
    // Stored procedure
   return pool.request()
       .execute('GetAddressee')
})
}


function addOrUpdateDetails(senderId, firstName, lastName, address, email, title, 
    text, width, height, background, border, fontcolor, font){
  
    return  sql.connect(sqlConfig).then(pool => {
           // Stored procedure
          return pool.request()
              .input('SenderId', sql.Int, senderId)
              .input('FirstName', sql.NVarChar(20), firstName)
              .input('LastName', sql.NVarChar(20), lastName)
              .input('Address', sql.NVarChar(50), address)
              .input('Email', sql.NVarChar(50), email)
              .input('Title', sql.NVarChar(50), title)
              .input('Text', sql.NVarChar(MAX), text)
              .input('Background', sql.NVarChar(20), background)
              .input('Border', sql.NVarChar(20), border)
              .input('FontColor', sql.NVarChar(20), fontcolor)
              .input('Font', sql.NVarChar(20), font)
              .input('Width', sql.Int, width)
              .input('Height', sql.Int, height) 
              .execute('AddOrUpdateDetails')
      })
      
  
    }
function addAddressee(name){
  
  return  sql.connect(sqlConfig).then(pool => {
         // Stored procedure
        return pool.request()
        .input('Name', sql.NVarChar(50), name)
       
       
            .execute('AddAddressee')
    })
   

  }

  
 
    
module.exports = { init, getDetails, addAddressee, addOrUpdateDetails, getAddressee};
