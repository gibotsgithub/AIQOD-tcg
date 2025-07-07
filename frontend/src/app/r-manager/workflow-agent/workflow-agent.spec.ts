import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowAgent } from './workflow-agent';

describe('WorkflowAgent', () => {
  let component: WorkflowAgent;
  let fixture: ComponentFixture<WorkflowAgent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowAgent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkflowAgent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
