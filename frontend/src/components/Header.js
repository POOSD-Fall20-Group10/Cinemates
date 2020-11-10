import React from 'react';

function Header()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var login = ud.login;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };

    const openNotifications = event => //Needs to open notification window
    {
	    event.preventDefault();
    };
    const openSettings = event => //Needs to send to settings page
    {
        event.preventDefault();
    };
    const openAccount = event => //Needs to send to Account page
    {
        event.preventDefault();
    };
    const openGroup = event => //Needs to be changed to work with dropdown menu to select active group
    {
        event.preventDefault();
        alert('Needs dropdown not button');
    };

    return(
        <div id="headerDiv">
            <button type="button" id="AccountButton" class="buttons" onClick={openAccount}> {login} </button>
            <button type="button" id="GroupSelector" class="buttons" onClick={openGroup}> Group </button>
            <button type="button" id="notificationsButton" class="buttons" onClick={openNotifications}> Notifications </button>
            <button type="button" id="settingsButton" class="buttons" onClick={openSettings}> Settings </button>
            <button type="button" id="logoutButton" class="buttons" onClick={doLogout}> Log Out </button>
        <div id="moviesDiv">
        </div>
        <div id="groupsDiv">
        </div>
    );
};

export default Header;
