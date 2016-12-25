import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import * as routes from "./app.routing";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
