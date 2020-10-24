""" Module for managing tasks through a simple cli interface. """
# Libraries
from manager import Manager

# from app import create_app

manager = Manager()


@manager.command
def run():
    """ Starts server. """
    print("Run app")
    # create_app()


if __name__ == '__main__':
    manager.main()
