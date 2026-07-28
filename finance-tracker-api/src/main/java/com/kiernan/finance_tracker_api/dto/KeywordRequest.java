package com.kiernan.finance_tracker_api.dto;

public class KeywordRequest {

    private String keyword;
    private int categoryId;
    private int transactionId;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public  int getTransactionId() {
        return transactionId;
    }
}