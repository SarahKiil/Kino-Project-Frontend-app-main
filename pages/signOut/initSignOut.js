export function initSignOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('token')
    localStorage.removeItem('roles')
    document.getElementById('loggedInAs').innerHTML ='<h4 className="text-end" id="loggedInAs"><a href="login" data-navigo>Sign In&nbsp;</a><a  href="signUp" data-navigo className="mr-4">Sign Up</a></h4>'
    document.getElementById('loggedInMessage').innerHTML ='<h4 className="text-end" id="loggedInMessage">You are now logged out</h4>'
    window.router.navigate("/#")
}

function signOut(){
    
}