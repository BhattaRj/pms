<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\Issue;
use App\User;
use Illuminate\Http\Request;

class IssuesController extends Controller
{
    protected $issue;
    protected $board;
    protected $user;

    protected $per_page = 100;

    /**
     * Default page no. for pagination.
     * @var integer
     */
    protected $current_page = 1;

    public function __construct(issue $issue, Board $board, User $user)
    {
        $this->issue = $issue;
        $this->board = $board;
        $this->user  = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $this->issue->orderBy('lft', 'asc');
        if ($request->has('currentPage')) {
            $this->current_page = $request->input('currentPage');
        }
        $skip            = ($this->current_page - 1) * $this->per_page;
        $result['total'] = $query->get()->count();
        $result['data']  = $query->skip($skip)->take($this->per_page)->get();

        return $result;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->input('data');

        $input['board_id']  = $this->board->getDefaultBoardId();
        $input['author_id'] = $this->user->currentUserId();
        $result['data']     = $this->issue->create($input);

        $this->updateRowOrder($result['data'], $request);

        $result['success'] = true;

        return $result;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $issue = $this->issue->findOrFail($id);

        if ($response = $this->updatePageOrder($page, $request)) {
            return $response;
        }

        $result['data']    = $issue->update($request->input('data'));
        $result['success'] = true;
        return $result;
    }

    public function show($id)
    {
        $result['data']    = $this->issue->findOrFail($id);
        $result['success'] = true;
        return $result;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->issue->destroy($id) ? $result['success'] = true : $result['success'] = false;
        return $result;
    }

    public function issueList()
    {
        $result['data'] = $this->issue->issueList();
        return $result;
    }

    /**
     * Reorder the issue in sprint.
     * if default_board change the board id into the default board.
     * @param  Request $request
     * @return [array]
     */
    public function reorderIssues(Request $request)
    {
        foreach ($request->all() as $data) {
            if (isset($data['default_board']) && $data['default_board'] == true) {
                $data['board_id'] = $this->board->getDefaultissueBoardId();
            }
            $this->issue->findOrFail($data['id'])->update($data);
        }

        $result['success'] = true;
        return $result;
    }

    protected function updateRowOrder(Issue $issue, Request $request)
    {
        if (array_key_exists('order', $request->input('data')) && array_key_exists('orderIssue', $request->input('data'))) {

            try
            {
                $issue->updateOrder($request->input('data')['order'], $request->input('data')['orderIssue']);
            } catch (MoveNotPossibleException $e) {
                $result['success'] = false;
                $result['msg']     = "Cannot make a page a child of self.";
                return $result;
            }
        }
    }

}
