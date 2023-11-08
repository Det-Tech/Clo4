
const cron = require('node-cron');

cron.schedule('*/30 * * * * *', async () => {
    // console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
    checkTradingPool();
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

const checkTradingPool = async () =>{
  try{
     console.log("check Trading pool:");
  }catch(error){
      console.log(error)
  }
}
