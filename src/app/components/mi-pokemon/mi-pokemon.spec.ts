import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiPokemon } from './mi-pokemon';

describe('MiPokemon', () => {
  let component: MiPokemon;
  let fixture: ComponentFixture<MiPokemon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiPokemon],
    }).compileComponents();

    fixture = TestBed.createComponent(MiPokemon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
