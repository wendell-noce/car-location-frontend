import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from "./core/interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    // Configuração de rotas da aplicação
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([AuthInterceptor]) // Adiciona o interceptor
    ),
    
    // Detecção de mudanças de zona
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Configuração do HttpClient
    provideHttpClient(),
  ],
};
