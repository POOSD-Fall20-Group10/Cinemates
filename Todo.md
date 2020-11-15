Frontend:   
Restrict page access by userID   
~~Register 2 columns for fields~~   
~~Move Header out of App.js~~   
Create headers for each page specifically   

Frontend Main:   
~~Create groups array~~ 
Organize Groups array onto page
~~Create movies array~~
Organized movie array onto page
Create group selector in movies section   

Frontend Account:   
Create areas for account name, desc
Way to open specific accounts per page

Frontend Group:
Display areas for group name, desc, members, yes movies list
Way to open specific groups per page

Email Verification:
-verfication: when u regester it creates the codes as void which is fine. When u try to login and isVerified=false, make a popup field to fill in the code. Say "email was sent to your account @" and use editUser to generate a vCode into the users table(generate everytime they try to login). Check the database code vs the code they fill in, once they fill the right code let them login, change isVerified=true and delete pcode from users.
-password recovery: click on forgot password and let them fill the email, if it matches a email in the database, use editUser to generate a pCode into the users table(generate everytime they try to forget password). Check the database code vs the code they fill in, once they fill the right code let them change password using editUser and delete pCode from users.

API:   
Add chat API. Takes in date/time, login, and message   

Backburner:   
Friends system   
