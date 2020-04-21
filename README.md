# CEN3031-team-project
Semester long team project for Spring 2020 UF CEN3031 Class


For our API, we used MongoDB as the service of choice for our backend. Our URI for the database can be found by signing into the deployment hosting website: https://www.heroku.com/. Within the website, there exist MLab. This is a database solution that contains all the users that can access the web application and all the medical tools that can be searched. 

# Steps to configure the app

## Get the uri from mLabs and configure configuration variables in heroku. 
The uri contains your database user information as well as your password. This is used to allow the app to connect to the database.

1. Navigate to MLab database within the heroku website. 
2. Add a user under the user tab. 
3. Find the uri on top of the page. It should look like this. mongodb://<dbuser>:<dbpassword>@ds117869.mlab.com:17869/heroku_7hwf8zr0
4. In the file config.env, the variable MONGO_URI is set to this value. This is for development purposes.
5. In heroku, click you the app and navigate to settings.
6. In the section labeled 'Config Vars', click the button to reveal the config variables. These variables are used as global variables when the app is deployed.
7. Enter a new variable called MONGODB_URI and set your database uri to the variable.

## Setting up aws s3 database for images. While instrument data is stored in mLabs, images are stored on aws.

1. Follow this tutorial to set up a bucket. https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html
2. Once you set up a bucket, click on the bucket, and navigate to the account settings pull down. 
3. Click on "My Security Credentials", navigate to "Access keys" and click on "Create new access key". 
4. Use the Access key ID and the Secret Access key and set them as configurtion variables in heroku like we did before. The configuration variables should be named AWSAccessKeyId and AWSSecretKey within heroku. 
5. Set these variables inside the config.env file as well for development purposes.

## Login credentials. Within our app, a default admin account has been made. The login credentials are below

name: admin
email: admin@admin
password: password


