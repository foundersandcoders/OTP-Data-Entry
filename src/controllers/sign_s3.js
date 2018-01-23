const aws = require('aws-sdk');
require('env2')('./config.env');
const S3_BUCKET = process.env.S3_BUCKET;

// set the region of the S3 bucket
aws.config.region = 'eu-west-2';

module.exports = (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      res.status(500).end();
    }

    res.status(200).end(
      JSON.stringify({
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      }),
    );
  });
};
