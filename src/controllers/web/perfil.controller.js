export function profileView(req, res) {
  if(req.session.admin){
    res.render('admin', {
      pageTitle: 'admin', user: req.session['user']
    })
  }else{
  res.render('profile', {
    pageTitle: 'Perfil', user: req.session['user']
  })}
}