from manager import Manager

manager = Manager()


@manager.command
def run():
    """ Starts server. """
    from app import create_app
    create_app()


if __name__ == '__main__':
    manager.main()
