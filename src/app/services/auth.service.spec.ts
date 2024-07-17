import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with an empty registered users array', () => {
    // Chama o construtor explicitamente para garantir que a inicialização ocorreu
    service = new AuthService();
    const users = localStorage.getItem('registeredUsers');
    expect(users).toBe('[]');
  });

  it('should register a new user successfully', (done: DoneFn) => {
    service.register('test@example.com', 'password').subscribe(success => {
      expect(success).toBeTrue();
      const users = JSON.parse(localStorage.getItem('registeredUsers')!);
      expect(users.length).toBe(1);
      expect(users[0].email).toBe('test@example.com');
      done();
    });
  });

  it('should not register an existing user', (done: DoneFn) => {
    service.register('test@example.com', 'password').subscribe(() => {
      service.register('test@example.com', 'password').subscribe(success => {
        expect(success).toBeFalse();
        done();
      });
    });
  });

  it('should login successfully with correct credentials', (done: DoneFn) => {
    service.register('test@example.com', 'password').subscribe(() => {
      service.login('test@example.com', 'password').subscribe(success => {
        expect(success).toBeTrue();
        expect(localStorage.getItem('currentUser')).toBe(JSON.stringify({ email: 'test@example.com' }));
        done();
      });
    });
  });

  it('should not login with incorrect credentials', (done: DoneFn) => {
    service.register('test@example.com', 'password').subscribe(() => {
      service.login('test@example.com', 'wrongpassword').subscribe(success => {
        expect(success).toBeFalse();
        expect(localStorage.getItem('currentUser')).toBeNull();
        done();
      });
    });
  });

  it('should logout successfully', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'test@example.com' }));
    service.logout();
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  it('should return true if a user is logged in', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'test@example.com' }));
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if no user is logged in', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should return true if a user is logged in using getUser', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'test@example.com' }));
    expect(service.getUser()).toBeTrue();
  });

  it('should return false if no user is logged in using getUser', () => {
    expect(service.getUser()).toBeFalse();
  });

  it('should return the user email if a user is logged in', () => {
    localStorage.setItem('currentUser', JSON.stringify({ email: 'test@example.com' }));
    expect(service.getUserEmail()).toBe('test@example.com');
  });

  it('should return undefined if no user is logged in', () => {
    expect(service.getUserEmail()).toBeUndefined();
  });
});
