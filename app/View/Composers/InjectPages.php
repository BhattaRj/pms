<?php
namespace App\View\Composers;

use App\Models\Admin\Company;
use App\Models\Admin\Page;
use Illuminate\View\View;

/**
 *
 */
class InjectPages
{
    protected $page;
    protected $company;
    public function __construct(Page $page, Company $company)
    {
        $this->page    = $page;
        $this->company = $company;
    }

    public function compose(View $view)
    {
        $pages   = $this->page->where('hidden', false)->get()->toHierarchy();
        $company = $this->company->get()->first();

        $view->with(compact('pages', 'company'));
    }
}
