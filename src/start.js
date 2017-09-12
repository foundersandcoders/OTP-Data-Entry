const app = require('./app.js');
require('env2')('./config.env');

app.listen(app.get('port'), () => {
  console.log('Server running at port ' + app.get('port'));
});
