#Frontend:   
Restrict page access by userID   
~~Register 2 columns for fields~~   
~~Move Header out of App.js~~   
Create headers for each page specifically   

##Frontend Main:   
~~Create groups array~~
Organize Groups array onto page
Add Group info to button
Add onCLick event to button That transfers page with info
~~Create movies array~~
Organized movie array onto page
Create group selector in movies section

##Frontend Account:   
Create areas for account name, desc
~~Way to open specific accounts per page~~

##Frontend Group:
Display areas for group name, desc, members, yes movies list
Way to open specific groups per page

#Email Verification:
-verification: when a user is added, a verification token is generated. an email is sent with a link that takes them to the Verify page and sends a get request with the token. code to handle the get is done in the API, still need a page at /Verify which will check whether the request returned success and redirect / show error appropriately. endpoint EmailVerification takes an email address, generates a new token and sends it. ~~Can have button when user logs in and is unverified asking if they want to resend.~~

-password recovery: PasswordReset endpoint takes an email, generates a password reset token and sends it to the email. When the link is clicked it takes the user to /Reset which checks the token same as /Verify. Need a page at that address which checks if the request was success, if so then have fields to enter new password. 

#API:   
Add chat API. Takes in date/time, login, and message
Add description to users

#Backburner:   
Friends system
Images for Accounts, Groups, Movies
