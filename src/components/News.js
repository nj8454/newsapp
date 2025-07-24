import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor(){
    super();
    this.state={
      articles: [],
      loading: true,
      page : 1,
    }
  }
  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=550ad5684f494d03819d35c9eadebb2f&page=${this.state.page}&pageSize=${this.props.pagesize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false
    })  
  }
  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=550ad5684f494d03819d35c9eadebb2f&page=1&pageSize=${this.props.pagesize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading: false
    // })
    this.updateNews();
  }

  handlePrevClick = async ()=>{
    // console.log("Previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=550ad5684f494d03819d35c9eadebb2f&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
    // this.setState({loading: true})
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page: this.state.page-1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({page: this.state.page-1})
    this.updateNews();
  }
  handleNextClick = async ()=>{
      // console.log("Next")
      // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=550ad5684f494d03819d35c9eadebb2f&page=${this.state.page+1}&pageSize=${this.props.pagesize}`;
      // this.setState({loading: true})
      // let data = await fetch(url);
      // let parsedData = await data.json()
      // console.log(parsedData);
      // this.setState({
      //   page: this.state.page+1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
      this.setState({page: this.state.page+1})
      this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row mx-3">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.titel?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark my-3" onClick={this.handlePrevClick}>&larr; previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pagesize)} type="button" className="btn btn-dark my-3" onClick={this.handleNextClick}>next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News