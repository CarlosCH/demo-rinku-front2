import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolesService } from './services/roles/roles.service';
import { EmpleadosService } from './services/empleados/empleados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  empleadoForm!: FormGroup;
  roles: any;
  empleados: any;

  constructor(
    public fb: FormBuilder,
    public rolesService: RolesService,
    public empleadosService: EmpleadosService,
  ) {

  }
  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      idEmpleado : [''],
      numeroEmpleado: ['', Validators.required],
      nombre: ['', Validators.required],
      rol: ['', Validators.required],
      mes: ['', Validators.required],
      numEntregas: ['', Validators.required],
      horas : ['', Validators.required],
      totalEntregas: [''],
      totalBonos : [''],
      retenciones : [''],
      vales: [''],
      total : ['']
    })

    this.rolesService.getAllRoles().subscribe((resp): Object => {
      console.log(resp);
      return this.roles = resp;
    })

    this.empleadosService.getAllEmpleados().subscribe((resp): Object => {
      console.log(resp);
      return this.empleados = resp;
    })
    
  }

  reload(): void{
    this.empleadosService.getAllEmpleados().subscribe((resp): Object => {
      console.log(resp);
      return this.empleados = resp;
    })
  }
  guardar(): void {
    this.empleadosService.saveEmpleado(this.empleadoForm.value).subscribe(resp => {
      this.empleadoForm.reset();
      console.log(resp);
      this.reload();
      //this.empleados.pop(resp);
      //this.empleados.push(resp);      
  })  
}
  eliminar(empleado:any): void{
    this.empleadosService.eliminarEmpleado(empleado.idEmpleado).subscribe(resp => {
      console.log(resp);
      if(resp== true){
      this.empleados.pop(empleado);    
    }      
  })
  }

  editar(empleado:any): void{
    console.log("editar");
    this.empleadoForm.setValue({
      idEmpleado: empleado.idEmpleado,
      numeroEmpleado: empleado.numeroEmpleado,
      nombre: empleado.nombre,
      rol: empleado.rol,
      mes: empleado.mes,
      numEntregas: empleado.numEntregas,
      horas: empleado.horas,
      totalEntregas: empleado.totalEntregas,
      totalBonos: empleado.totalBonos,
      retenciones: empleado.retenciones,
      vales: empleado.vales,
      total: empleado.total
    })
  }
}
