package com.sweteam13.issue_back.dto.object;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardListItem {
    private int issue_no;
    private String title;
    private String content;
    private String boardTitleImage;
    private int commentCount;
    private int viewCount;
    private String writeDatetime;
    private String writerId;
    private String status;
    
}
