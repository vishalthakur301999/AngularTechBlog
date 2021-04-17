import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css', '../tachyons/tachyons.min.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let menuIsOpen = false;
    const menu = document.getElementById('menu');
    const menuBtn = document.getElementById('menu-btn');
    const closeMenu = () => {
      // @ts-ignore
      menu.className = menu.className.replace('left-50', 'left-100');
      // @ts-ignore
      menuBtn.innerHTML = 'Menu';
      menuIsOpen = false;
    };
    const openMenu = () => {
      // @ts-ignore
      menu.className = menu.className.replace('left-100', 'left-50');
      // @ts-ignore
      menuBtn.innerHTML = 'Close';
      menuIsOpen = true;
    };

    window.onload = () => {
      // bind click handler to menu button
      // @ts-ignore
      menuBtn.onclick = (e) => {
        e.preventDefault();
        if (menuIsOpen) { closeMenu(); }
        else { openMenu(); }
      };
    };
    window.onresize = closeMenu;
  }

}
