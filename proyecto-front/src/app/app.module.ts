import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './layout/nav/nav.component';
import { GroupComponent } from './pages/group/group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrouptextchannelComponent } from './pages/group/grouptextchannel/grouptextchannel.component';
import { GroupvoicechannelComponent } from './pages/group/groupvoicechannel/groupvoicechannel.component';
import { FriendlistComponent } from './pages/friendlist/friendlist.component';
import { FriendchatComponent } from './pages/friendchat/friendchat.component';

import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ChangenameComponent } from './pages/changename/changename.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { DirectmessagesComponent } from './pages/directmessages/directmessages.component';
import { ChannellistComponent } from './pages/group/channellist/channellist.component';
import { ListausuariosComponent } from './pages/group/listausuarios/listausuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GroupComponent,
    GrouptextchannelComponent,
    GroupvoicechannelComponent,
    FriendlistComponent,
    FriendchatComponent,
    HomeComponent,
    RequestsComponent,
    LoginComponent,
    RegisterComponent,
    ChangenameComponent,
    ChangepasswordComponent,
    DirectmessagesComponent,
    ChannellistComponent,
    ListausuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
