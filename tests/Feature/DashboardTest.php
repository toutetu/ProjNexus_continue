<?php

namespace Tests\Feature;

use App\Enums\ProjectStatus;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Enums\TaskType;
use App\Models\Department;
use App\Models\Project;
use App\Models\ProjectWorkItem;
use App\Models\User;
use Database\Seeders\DepartmentSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed([DepartmentSeeder::class, RolePermissionSeeder::class]);
    }

    public function test_hq_manager_can_view_dashboard_with_department_progress(): void
    {
        $dept = Department::query()->where('name', '開発1部')->firstOrFail();
        $hqDept = Department::query()->where('name', '本部')->firstOrFail();

        $applicant = User::factory()->create(['department_id' => $dept->id]);
        $applicant->assignRole('applicant');

        $hq = User::factory()->create(['department_id' => $hqDept->id]);
        $hq->assignRole('hq_manager');

        $project = Project::query()->create([
            'title' => 'ダッシュボード検証',
            'applicant_id' => $applicant->id,
            'department_id' => $dept->id,
            'primary_assignee_id' => $applicant->id,
            'status' => ProjectStatus::Approved,
            'estimated_amount' => 100000,
            'budget_amount' => 100000,
            'actual_amount' => 80000,
            'revision' => 1,
        ]);

        ProjectWorkItem::query()->create([
            'project_id' => $project->id,
            'title' => '検証タスク',
            'task_type' => TaskType::Task,
            'priority' => TaskPriority::Medium,
            'status' => TaskStatus::Open,
            'progress_rate' => 50,
            'assignee_id' => $applicant->id,
            'created_by' => $applicant->id,
        ]);

        $response = $this->actingAs($hq)->get(route('dashboard'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('Dashboard/Index')
            ->has('kpi')
            ->has('departmentProgress', 1)
            ->where('departmentProgress.0.name', '開発1部')
            ->where('departmentProgress.0.rate', 50));
    }
}
