import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isAdmin = false;
  showPassword = false;

  username = '';
  password = '';

  toggleRole(adminState: boolean): void {
    this.isAdmin = adminState;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const payload = {
      role: this.isAdmin ? 'ADMIN' : 'USER',
      username: this.username,
      password: this.password
    };
    console.log('Form Submitted:', payload);
  }
}
 html.ts

 <div class="login-wrapper">
  <div class="login-card">
    
    <!-- Logo & Header -->
    <div class="login-header">
      <h1 class="logo-text">TLO</h1>
      <h2>{{ isAdmin ? 'Admin Portal' : 'Sign In' }}</h2>
      <p>Please enter your details</p>
    </div>

    <!-- Role Switcher Slider -->
    <div class="role-toggle-container">
      <div class="role-toggle-slider" [class.admin-active]="isAdmin"></div>
      <button 
        type="button" 
        class="role-btn" 
        [class.active]="!isAdmin" 
        (click)="toggleRole(false)">
        <i class="fa-regular fa-user"></i>
        User
      </button>
      <button 
        type="button" 
        class="role-btn" 
        [class.active]="isAdmin" 
        (click)="toggleRole(true)">
        <i class="fa-solid fa-user-shield"></i>
        Admin
      </button>
    </div>

    <!-- Form -->
    <form class="login-form" (ngSubmit)="onSubmit()">
      
      <!-- Username Field -->
      <div class="input-group">
        <i class="fa-regular fa-user icon"></i>
        <input 
          type="text" 
          [(ngModel)]="username" 
          name="username" 
          [placeholder]="isAdmin ? 'Admin Username*' : 'Username*'" 
          required />
      </div>

      <!-- Password Field -->
      <div class="input-group">
        <i class="fa-solid fa-lock icon"></i>
        <input 
          [type]="showPassword ? 'text' : 'password'" 
          [(ngModel)]="password" 
          name="password" 
          placeholder="Password*" 
          required />
        <i 
          class="toggle-password" 
          [ngClass]="showPassword ? 'fa-solid fa-eye' : 'fa-regular fa-eye-slash'"
          (click)="togglePasswordVisibility()">
        </i>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="submit-btn" [class.admin-btn]="isAdmin">
        Sign In as {{ isAdmin ? 'Admin' : 'User' }}
      </button>

    </form>
  </div>
</div>
login.html

.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 1.5rem;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(30, 41, 59, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  color: #f8fafc;
}

.login-header {
  text-align: center;
  margin-bottom: 1.75rem;

  .logo-text {
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #38bdf8, #818cf8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0 0 0.25rem 0;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: #f1f5f9;
  }

  p {
    font-size: 0.875rem;
    color: #94a3b8;
    margin-top: 0.25rem;
  }
}

/* Sliding Pill Toggle */
.role-toggle-container {
  position: relative;
  display: flex;
  background: #0f172a;
  border-radius: 30px;
  padding: 4px;
  margin-bottom: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);

  .role-toggle-slider {
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background: linear-gradient(135deg, #0284c7, #2563eb);
    border-radius: 26px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease;

    &.admin-active {
      transform: translateX(100%);
      background: linear-gradient(135deg, #dc2626, #991b1b);
    }
  }

  .role-btn {
    position: relative;
    z-index: 1;
    flex: 1;
    background: transparent;
    border: none;
    color: #94a3b8;
    padding: 0.65rem 0;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &.active {
      color: #ffffff;
    }
  }
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .input-group {
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: 14px;
      color: #64748b;
      font-size: 1.1rem;
      pointer-events: none;
      transition: color 0.2s ease;
    }

    input {
      width: 100%;
      padding: 0.85rem 2.75rem 0.85rem 2.75rem;
      background: #0f172a;
      border: 1px solid #334155;
      border-radius: 10px;
      color: #f8fafc;
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &::placeholder {
        color: #64748b;
      }

      &:focus {
        border-color: #38bdf8;
        box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);

        & ~ .icon {
          color: #38bdf8;
        }
      }
    }

    .toggle-password {
      position: absolute;
      right: 14px;
      color: #64748b;
      font-size: 1.1rem;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: #f8fafc;
      }
    }
  }

  .submit-btn {
    margin-top: 0.5rem;
    padding: 0.85rem;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #0284c7, #2563eb);
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
    }

    &:active {
      transform: translateY(0);
    }

    &.admin-btn {
      background: linear-gradient(135deg, #dc2626, #991b1b);

      &:hover {
        box-shadow: 0 4px 12px rgba(220, 38, 38, 0.35);
      }
    }
  }
}
--------login.scss

<<<<<<< HEAD
# test-project
=======
# Testproject11

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.27.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/c
