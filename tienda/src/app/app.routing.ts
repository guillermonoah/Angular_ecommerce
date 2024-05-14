import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { PerfilComponent } from "./components/usuario/perfil/perfil.component";
import { Authguard } from "./guards/auth.guard";

const appRoute: Routes = [
    {path:'', component: InicioComponent},
    {path:'login', component: LoginComponent},

    {path:'cuenta/perfil', component: PerfilComponent, canActivate:[Authguard]},
]

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoute);