$(function () {
  $('.editor-tool-btn').click(function (e) {
    // const role = $(this).data('role')
    // const range = window.getSelection().getRangeAt(0)
    // console.log(role, range)
    switch ($(this).data('role')) {
      case 'fontName':
        document.execCommand($(this).data('role'), false, $(this).data('value'))
        break
      case 'fontSize':
        console.log($(this).data('value'))
        document.execCommand($(this).data('role'), false, $(this).data('value'))
        break
      default:
        document.execCommand($(this).data('role'), false, null)
        break
    }
  })
})
