from manager import Manager
from app import create_app

manager = Manager()


@manager.command
def run():
    """ Starts server. """
    create_app()


if __name__ == '__main__':
    manager.main()
