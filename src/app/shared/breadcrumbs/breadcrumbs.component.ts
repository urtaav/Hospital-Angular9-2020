import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  title_page:string;

  constructor( private router:Router,private title:Title,private meta:Meta) { 

  this.getDataRoute().subscribe (data =>{
    this.title_page = data.title;
    this.title.setTitle(this.title_page);
    const metaTag: MetaDefinition ={
      name:'description',
      content:this.title_page
    }
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event:ActivationEnd) => event.snapshot.firstChild === null),
      map( (event:ActivationEnd) => event.snapshot.data)
    )
  }

}
