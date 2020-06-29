import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  desde: number = 0;

  totalRegisters:number = 0;
  loading: boolean = true;

  constructor(public _userService: UserService, public _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.loadUsers();
    this._modalUploadService.notification.subscribe( resp => this.loadUsers())
  }

  loadUsers(){

    this.loading = true;

    this._userService.loadUsers(this.desde)
      .subscribe((resp:any) => {
        this.totalRegisters = resp.total;
        this.users = resp.users;
        this.loading = false;
      });
  }

  changeDesde(numPage:number){
    let desde = this.desde + numPage;
    if(desde >= this.totalRegisters){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += numPage;
    this.loadUsers();
  }

  searchUser(query:string){

    if(query.length <= 0){
      this.loadUsers();
      return;
    }
    this.loading = true;
    this._userService.searchUsers(query)
      .subscribe( (users:User[]) =>{
        this.users = users;
        this.loading = false;
      })
    
  }

  deleteUser(user:User){

    if(user._id === this._userService.user._id){
      Swal.fire('No puede borrar usuario', 'NO se puede borrar a usted mismo', 'error');
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Esta seguro?',
      text: 'esta apunto de eliminar a el usuario ' + user.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {

      if (result.value) {

        this._userService.deleteUser(user._id)
          .subscribe( (resp:any) =>{

            swalWithBootstrapButtons.fire(
              'Eliminado!',
              'Usuario  eliminado correctamente',
              'success'
            )
            this.desde = 0;
            this.loadUsers();
          });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          ':(',
          'error'
        )
      }
    })
    
  }

  saveUser(user:User){
    this._userService.updateUser(user)
      .subscribe();
  }
  showModal(id:string){
    this._modalUploadService.showModal('users',id);
  }
}
