// 下载文件
function out() {
    let params = this.initDate({}, this.dateRange)
    let url = apiurl.exportOrders
    if (JSON.stringify(params) !== '{}') {
      url += '?' + qs.stringify(params)
    }
    this.$post({
      url: url,
      isLoading: true,
      postType: "arraybuffer",
      loadingTarget: '.grid-content',
      loadingText: "导出中..."
    }).then(res=> {
      let url = window.URL.createObjectURL(new Blob([res.data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "订单数据.xlsx");
      document.body.appendChild(link);
      link.click();
    })
  }