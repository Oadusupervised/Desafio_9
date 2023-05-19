export function CurrentView(req, res) {
  if(req.session.admin){
    res.render('admin', {
      pageTitle: 'admin', user: req.session['user']
    })
  }else{
  res.render('Current', {
    pageTitle: 'Perfil', user: req.session['user']
  })}
}