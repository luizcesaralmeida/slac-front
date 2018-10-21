import { Usuario } from './../../modelos/usuario';
import { Component } from '@angular/core';
import { HomePage } from './../home/home';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserServiceProvider } from './../../providers/user-service/user-service';

@IonicPage( )
@Component( {
  selector: 'page-login',
  templateUrl: 'login.html',
} )
export class LoginPage {

  usuario: Usuario = new Usuario( );
  
  constructor( 
    public _navCtrl: NavController, 
    public _navParams: NavParams,
    private _userServiceProvider: UserServiceProvider,
    private _alertCtrl: AlertController ) {
      this.usuario.login = 'Luiz';
      this.usuario.senha = '123456';
    }

  ionViewDidLoad() {}

  onLoginClick( ) {
      this._userServiceProvider.efetuaLogin( this.usuario )
      .subscribe( ( usuario: Usuario ) => this.validaLogin( usuario ), 
      ( err ) => {
      console.log( err );    
        this._alertCtrl.create({
        title: 'Falha no login!',
        subTitle: 'Tente novamente mais tarde',
        buttons: [
          { text: 'OK' }
        ]
      }).present();
    } 
    );
  }

  validaLogin( usuario: Usuario ): void {
    if( usuario )
      this._navCtrl.setRoot( HomePage.name, { usuarioLogado: usuario } );
    else
    this._alertCtrl.create( {
      title: 'Falha no login!',
      subTitle: 'Usuário ou senha inválidos',
      buttons: [
        { text: 'OK' }
      ]
    } ).present( );
  }
}
