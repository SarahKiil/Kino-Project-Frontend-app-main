import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"
import {
    setActiveLink, renderHtml, loadHtml, showPopup, adjustForMissingHash
} from "./utils.js"

import {initLogin, toggleLoginStatus} from "./pages/login/login.js"
import {initShowAllUsers} from "./pages/showAllUsers/showAllUsers.js";
import {initSignUp} from "./pages/signUp/signUp.js";
import {initSignOut} from "./pages/signOut/initSignOut.js";
import {initAktuelleFilm} from "./pages/aktuelleFilm/aktuelleFilm.js";
import {initBiografSal} from "./pages/biografSal/biografSal.js";
import {initAddShowing} from "./pages/addShowing/addShowing.js";
import {initAddFilm} from "./pages/addFilms/addFilms.js"
import {initFindFilm} from "./pages/findFilm/findFilm.js";
import {initShowing} from "./pages/showing/showing.js";
import {initReservation} from "./pages/reservation/reservation.js";
import {initHome} from "./pages/home/home.js";
import { initShowReservations } from "./pages/showReservations/showReservations.js";

window.addEventListener("load", async () => {

    const templateLogin = await loadHtml("./pages/login/login.html")
    const templateShowAllUsers = await loadHtml("./pages/showAllUsers/showAllUsers.html")
    const templateSignUp = await loadHtml("./pages/signUp/signUp.html")
    const templateAktuelleFilm = await loadHtml("./pages/aktuelleFilm/aktuelleFilm.html")
    const templateBiografSal = await loadHtml("./pages/biografSal/biografSal.html")
    const templateAddShowing = await loadHtml("./pages/addShowing/addShowing.html")
    const templateAddFilm = await loadHtml("./pages/addFilms/addFilms.html")
    const templateFindFilm = await loadHtml("./pages/findFilm/findFilm.html")
    const templateShowing = await loadHtml("./pages/showing/showing.html")
    const templateReservation = await loadHtml("./pages/reservation/reservation.html")
    const templateHome = await loadHtml("./pages/home/home.html")
    const templateShowReservations = await loadHtml("./pages/showReservations/showReservations.html")

    toggleLoginStatus()
    

    const router = new Navigo("/", {hash: true});
    //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
    window.router = router

    router
        .hooks({
            before(done, match) {
                if(match.url === "/"){
                    match.url = "/#/"
                }
                setActiveLink("menu", match.url)
                done()
                burgerMenuHide()
                adjustForMissingHash()
                document.getElementById("logo_link").addEventListener("click", () => {
                    window.router.navigate("/#")
                })
            }
        })
        .on({
            
            "/" : () => {
                renderHtml(templateHome, "content")
                initHome()
                toggleLoginStatus()
            }, "/login": () => {
                showPopup(templateLogin, "content")
                initLogin()
                adjustForMissingHash()
            }, "/users": () => {
                renderHtml(templateShowAllUsers, "content")
                initShowAllUsers()
                adjustForMissingHash()
            }, "/signOut": () => {
                renderHtml(templateLogin, "content")
                initSignOut()
                toggleLoginStatus()
                adjustForMissingHash()
            }, "/signUp": () => {
                renderHtml(templateSignUp, "content")
                initSignUp()
                adjustForMissingHash()
            }, "/aktuelleFilm": () => {
                renderHtml(templateAktuelleFilm, "content")
                initAktuelleFilm()
            }, "/biografSal": () => {
                renderHtml(templateBiografSal, "content")
                initBiografSal()
                adjustForMissingHash()
            }, "/addShowing": () => {
                renderHtml(templateAddShowing, "content")
                initAddShowing()
                adjustForMissingHash()
            }, "/addFilm": () => {
                renderHtml(templateAddFilm, "content")
                initAddFilm()
            }, "/find-film": (match) => {
                renderHtml(templateFindFilm, "content")
                initFindFilm(match)
                adjustForMissingHash()
            }, "/showing": (match) => {
                renderHtml(templateShowing, "content")
                initShowing(match)
            }, "/reservation": (match) => {
                renderHtml(templateReservation, "content")
                initReservation(match)
            }, "/showReservations": () => {
                renderHtml(templateShowReservations, "content")
                initShowReservations()
            }
            
        })
        .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' + errorObj);
}

if (localStorage.getItem('username') !== null) document.getElementById('loggedInAs').innerHTML = `Logged in as ${localStorage.getItem('username')}<a href="signOut" data-navigo style="margin-left: 10px; margin-right: 10px; font-size: 12px;">Sign Out</a>`

function initUser(userId) {
    // Do something with the userId, e.g., display it on the page or perform some action
    console.log("User ID:", userId);
}

function burgerMenuHide(){
const links = document.querySelectorAll('.menu-items a');
const checkbox = document.querySelector('.checkbox');
const logoLink = document.querySelector('#logo');


document.addEventListener("click", (event) => {
    const leftnav = document.querySelector('.menu-items');
    if (event.target !== leftnav && event.target !== checkbox) {
        checkbox.checked = false;
    }
});

links.forEach(link => {
  link.addEventListener('click', () => {
    checkbox.checked = false;
  });
});
logoLink.addEventListener('click', () => {
  checkbox.checked = false;
});
}