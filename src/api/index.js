import {login,codesnd} from './login'
import {getUserInfo,addfollow,removefollow,collectArt,cancelColl} from './user'
import {channels,getAllChannels,deleteChannels,addUserChannels} from './channels'
import {getArticles,getArticlesItem,getComments,postComments,addLike,deleteLike} from './articles'
import {getSearchSuggestion,getSearchResult} from './search'

export const loginAPI=login
export const codesndAPI=codesnd
export const getUserInfoAPI=getUserInfo
export const channelsAPI=channels
export const getArticlesAPI=getArticles
export const getAllChannelsAPI=getAllChannels
export const deleteChannelsAPI=deleteChannels
export const addUserChannelsAPI=addUserChannels
export const getSearchSuggestionAPI=getSearchSuggestion
export const getSearchResultAPI=getSearchResult
export const getArticlesItemAPI=getArticlesItem
export const addfollowAPI=addfollow
export const removefollowAPI=removefollow
export const collectArtAPI=collectArt
export const cancelCollAPI=cancelColl
export const getCommentsAPI=getComments
export const postCommentsAPI=postComments
export const addLikeAPI=addLike
export const deleteLikeAPI=deleteLike