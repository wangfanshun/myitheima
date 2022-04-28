import request from '@/utils/request'
//获取文章列表
export const getArticles=params=>{
    return request({
        method:'GET',
        url:'/v1_0/articles',
        params
    })
}
//获取文章详情
export const getArticlesItem=articleId=>{
    return request({
        method:'GET',
        url:`/v1_0/articles/${articleId}`,
    })
}
//获取文章评论
export const getComments=params=>{
    return request({
        method:'GET',
        url:'/v1_0/comments',
        params
    })
}
//发送文章评论
export const postComments=data=>{
    return request({
        method:'POST',
        url:'/v1_0/comments',
        data
    })
}
/**
 * 点赞文章
 */
export const addLike = target => {
    return request({
      method: 'POST',
      url: '/v1_0/article/likings',
      data:{target}
    })
  }

  /**
   * 取消点赞文章
   */
  export const deleteLike = target => {
    return request({
      method: 'DELETE',
      url: `/v1_0/article/likings/${target}`
    })
  }