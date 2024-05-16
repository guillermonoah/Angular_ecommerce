import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { Authguard } from "./guards/auth.guard";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";

const appRoute: Routes = [
    {path:'', component: InicioComponent},
    {path:'login', component: LoginComponent},

    {path:'cuenta/perfil', component: PerfilComponent, canActivate:[Authguard]},
    {path:'productos', component: IndexProductoComponent},//no lleva con activate por que es de ambito publico
    {path:'productos/categoria/:categoria', component: IndexProductoComponent},
]

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoute);