from pyramid.view import view_config


@view_config(route_name='home', renderer='templates/mytemplate.pt')
def my_view(request):
    return {'project': 'ShiftScheduler'}


@view_config(route_name='index', renderer='templates/index.pt')
def my_view(request):
    return {'project': 'ShiftScheduler'}
