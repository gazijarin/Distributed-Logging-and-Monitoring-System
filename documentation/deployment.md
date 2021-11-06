** DEPLOYMENT: AWS VS HEROKU **

Since our application is based on a distributed architecture, we expect various different applications to be submitting logging data. As a result, we want our app to be deployed on a system with high uptime, low downtime, and several safety features. Our two candidates under consideration are Amazon Web Services (AWS) and Heroku.

### AWS

AWS is currently the global leader in cloud hosting, and comes with a variety of features.

### AWS PROS
- Extremely Diverse Array of Services
    AWS has over 70 different services built into it, and several of these services may be very useful for the deployment and maintenance of our app.
- Extremely High Uptime and Server Capacity
    Since AWS is so widely used, the AWS team have ensured that server capacity remains very high and downtime quite low. This is a great benefit to using AWS.
- Encryption/Security Services Out of the Box
    AWS has a variety of security & encryption services that we can use. Especially since our application may potentially deal with critical or sensitive data, a reliable encryption/security service is a must.

### AWS CONS
- Billing is High & Often Unpredictable
    AWS prices are generally high, and although a billing calculator is available, it is not uncommon to be overcharged because of simple things such as letting a virtual machine run for longer than expected.
- Risk of Data Leak / General Privacy Concerns
    AWS stores data in various data centers for redundancy/backup reasons. This may potentially lead to compromised security.

### HEROKU

Heroku is a cloud platform as a service offering hosting for web applications and support for various languages.

### HEROKU PROS

- Ease of Use
    Heroku appears to be very easy to use. Additionally, previous courses taken by our team members such as CSC309 has given us experience with Heroku.
- Fast Setup & Easy Deployment
    Heroku appears to be significantly more simple to setup than AWS

### HEROKU CONS

- Lack of Features/Services
    Although Heroku is very simple to setup and use, it lacks various services and features that AWS has, especially when it comes to security and encryption.
- Higher Downtime & Lower Reliability
    Heroku has had significantly higher downtime than more trusted and reputable cloud platforms such as AWS. This leads to lower reliability and could potentially be a problem for our team.
- Limited Choice of Languages & Database Support
    There are fewer compatible languages and databases that are supported by Heroku in comparison to AWS. This may be a hurdle in the future should our team decide to scale and add extra features, or should another language/database be implemented within our application.