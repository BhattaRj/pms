<?php
namespace App\Presenters;

// use League\CommonMark\CommonMarkConverter;
use Lewis\Presenter\AbstractPresenter;

/**
 *
 */
class PagePresenter extends AbstractPresenter
{
    // protected $markdown;

    // public function __construct($object, CommonMarkConverter $markdown)
    // {
    //     $this->markdown = $markdown;
    //     parent::__construct($object);
    // }

    public function prettyUri()
    {
        return '/' . ltrim($this->uri, '/');
    }

    // public function contentHtml()
    // {
    //     return $this->markdown->convertToHtml($this->content_title);
    // }
    public function slugWildCard()
    {
        return $this->slug . '*';
    }
}
