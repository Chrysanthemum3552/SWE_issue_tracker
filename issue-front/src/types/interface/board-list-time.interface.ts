export default interface BoardListItem {
    issue_no: number;
    title: string;
    content: string;
    commentCount: number;
    viewCount: number;
    writeDatetime: string;
    writerName: string;
    status: string;
    type: string;
    name: string;
    fixer: string;
    assignee: string;
    priority: string
}