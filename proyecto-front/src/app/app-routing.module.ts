import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GroupComponent } from './pages/group/group.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RegisterComponent } from './pages/register/register.component';
import { GrouptextchannelComponent } from './pages/group/grouptextchannel/grouptextchannel.component';
import { GroupvoicechannelComponent } from './pages/group/groupvoicechannel/groupvoicechannel.component';
import { DirectmessagesComponent } from './pages/directmessages/directmessages.component';
import { ChangenameComponent } from './pages/changename/changename.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { FriendchatComponent } from './pages/directmessages/friendchat/friendchat.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'requests',component:RequestsComponent},
  {path: 'directMessages',component:DirectmessagesComponent,
    children:[
      {path:':idChannel',component:FriendchatComponent}
    ]}, 
  {path: 'changeName', component:ChangenameComponent},
  {path: 'changePassword', component:ChangepasswordComponent},
  {path: 'group/:idGroup',component:GroupComponent,
    children:[
      {path:'text/:idChannel',component:GrouptextchannelComponent},
      {path:'voice/:idChannel',component:GroupvoicechannelComponent}
    ]},
  {path: '*',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
